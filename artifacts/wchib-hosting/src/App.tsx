import { type ReactNode } from 'react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { SiteLayout } from '@/components/layout/site-layout';
import { AboutPage, DiscordPage, FaqPage, FeaturesPage, HomePage, NotFoundPage, PlanRoute, PlansPage } from '@/pages/site-pages';

function Router() {
  return (
    <RoutedErrorBoundary>
      <SiteLayout>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/plans" component={PlansPage} />
          <Route path="/plans/:slug" component={PlanRoute} />
          <Route path="/features" component={FeaturesPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/discord" component={DiscordPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </SiteLayout>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
