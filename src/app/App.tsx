import { Toaster } from "react-hot-toast";

import { AppRouter } from "@/app/AppRouter";
import AppProviders from "@/app/providers/AppProviders";
import { Router } from "@/app/router/Router";

import AppLayout from "@/widgets/AppLayout";
import Header from "@/widgets/Header";

const App = () => {
  return (
    <AppProviders>
      <AppLayout>
        <Toaster />
        <Router>
          <Header />
          <AppRouter />
        </Router>
      </AppLayout>
    </AppProviders>
  );
};

export default App;
