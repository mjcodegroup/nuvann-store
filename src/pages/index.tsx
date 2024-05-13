import LanguageSelector from "@/components/language-selector";
import { Inter } from "next/font/google";
import { useTranslation } from "react-i18next";
import HomeController from "./home/controller/home";

const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const { t } = useTranslation('en', { useSuspense: false });
//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh'
//     }}>
//     <LanguageSelector/>
//     <br />
//     <div>
//     { t('home.welcome')}
//     </div>
//     </div>
//   );
// }

export default HomeController
