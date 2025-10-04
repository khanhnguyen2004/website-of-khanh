import AppBanner from "@/components/app.banner";
import AppCategory from "@/components/app.category";
import AppLogoBrand from "@/components/app.logo-brand";
import AppProductNew from "@/components/app.product-new";
import AppProductTop from "@/components/app.product-top";
import AppHeader from "@/components/app.header";
import AppFooter from "@/components/app.footer";
import AppReview from "@/components/app.review";

export default function Home() {
  return (
    <>
      <div className="container">
        <header>
          <AppHeader />
        </header>
        <main>
          <AppBanner />
          <AppLogoBrand />
          <AppProductNew />
          <AppProductTop />
          <AppCategory />
          <AppReview />
        </main>
        <footer>
          <AppFooter />
        </footer>
      </div>
    </>
  );
}
