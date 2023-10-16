class Alea {
  public s0: number;
  public s1: number;
  public s2: number;
  public c: number;

  constructor(seed: string) {
    this.s0 = 0;
    this.s1 = 0;
    this.s2 = 0;
    this.c = 1;
    this.initialize(seed);
  }

  private mash(data: string): number {
    let n = 0xefc8249d;
    data = data.toString();
    for (let i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  }

  private initialize(seed: string): void {
    let mash = this.mash;
    this.s0 = mash(" ");
    this.s1 = mash(" ");
    this.s2 = mash(" ");

    this.s0 -= mash(seed);
    if (this.s0 < 0) {
      this.s0 += 1;
    }
    this.s1 -= mash(seed);
    if (this.s1 < 0) {
      this.s1 += 1;
    }
    this.s2 -= mash(seed);
    if (this.s2 < 0) {
      this.s2 += 1;
    }
    mash = null;
  }

  public next(): number {
    const t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
    this.s0 = this.s1;
    this.s1 = this.s2;
    return (this.s2 = t - (this.c = t | 0));
  }
}

function copy(f: Alea, t: Alea): Alea {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

interface PRNG {
  (): number;
  int32(): number;
  double(): number;
  quick: PRNG;
  state?(): Alea;
}

function impl(seed: string, opts?: { state?: Alea }): PRNG {
  const xg = new Alea(seed);
  const state = opts && opts.state;
  const prng: PRNG = () => xg.next();

  prng.int32 = function () {
    return (xg.next() * 0x100000000) | 0;
  };

  prng.double = function () {
    return prng() + ((prng() * 0x200000) | 0) * 1.1102230246251565e-16; // 2^-53
  };

  prng.quick = prng;

  if (state) {
    if (typeof state === "object") {
      copy(state, xg);
    }
    prng.state = function () {
      return copy(xg, new Alea("")); // Change "" to your desired initial seed value
    };
  }

  return prng;
}

export const rand: PRNG = impl;
