import CenteredMessage from "@/components/ui/client/CenteredMessage";
import { makeGenerateMetadata } from "@/lib/seo";

export const generateMetadata = makeGenerateMetadata({
  namespace: "orderConfirmation",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

export default function CheckoutPage() {
  return <CenteredMessage />;
}
