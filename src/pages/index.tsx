import HomePage from "~/templates/HomePage";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Landing",
          description:
            "The Munchers, a species of monsters shrouded in mystery and hunger, wander the vastness of the universe in search of sustenance. Their insatiable appetite is the stuff of legend, and they have returned to wreak havoc upon the digital realm. Their latest quarry: the nutrient-rich data contained within the blocks of the virtual world. Be warned; those who dare to venture into their territory risk becoming their next meal. Welcome to the era of the Munchers.",
        }}
      />
      <HomePage />
    </>
  );
}
