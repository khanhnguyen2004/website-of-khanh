import AppBanner from "@/components/app.banner";
import AppCategory from "@/components/app.category";
import AppLogoBrand from "@/components/app.logo-brand";
import AppProductNew from "@/components/app.product-new";
import AppProductTop from "@/components/app.product-top";
import AppReview from "@/components/app.review";

export default function Home() {
  return (
    <>
      <AppBanner />
      <AppLogoBrand />
      <AppProductNew />
      <AppProductTop />
      <AppCategory />
      <AppReview />
    </>
  );
}
