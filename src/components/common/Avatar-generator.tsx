import { useEffect, useRef } from "react";
import { generateSvgAvatar } from "~/utils/avatar-generator";

const AvatarGenerator = ({ seed }: { seed: string }) => {
  const imgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = generateSvgAvatar(seed.toLowerCase());
    if (imgRef.current) imgRef.current.innerHTML = svg.innerHTML;
  }, [seed]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      ref={imgRef}
      style={{ borderRadius: "50%" }}
    />
  );
};

export default AvatarGenerator;
