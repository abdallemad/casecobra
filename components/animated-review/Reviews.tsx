import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import whatPeopleBy from "@/assets/what-people-are-buying.png";
import ReviewsGrid from "./ReviewsGrid";
export default function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <>
        <Image
          src={whatPeopleBy.src}
          width={100}
          height={200}
          alt="what people buy"
          aria-hidden={true}
          className="absolute select-none  hidden xl:block -left-32 top-1/3"
        />
        <ReviewsGrid />
      </>
    </MaxWidthWrapper>
  );
}
