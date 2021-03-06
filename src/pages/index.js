import React, { useState, useEffect, useContext } from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useAuth } from "gatsby-theme-firebase";
import { manageStripeSubscription } from '../utils/stripeActions';
import { getStripeSubscription } from '../utils/firebaseActions';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

function IndexPage() {
  const { isLoading, isLoggedIn, profile } = useAuth();
  const [stripePlan, setStripePlan] = useState(null);
  const themeDispatch = useContext(GlobalDispatchContext)

  useEffect(() => {
    if (profile) {
      getStripeSubscription(profile.uid)
        .then(res => {
          if (res) {
            setStripePlan(res)
          }
          else {
            setTimeout(
              function () {
                getStripeSubscription(profile.uid)
                  .then(res => setStripePlan(res))
              }, 2500)
          }
        });
    }
  }, [profile])


  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <div className="text-center text-2xl font-bold tracking-wide" >{isLoggedIn ? `Welcome ${profile.displayName}` : 'Hello!'}</div>
      {isLoading ? null :
        <div className="flex justify-center mt-10 outline-none">
          {isLoggedIn ?
            <div className="text-center">
              <div className="mt-8 mb-16 text-3xl">You are on the <span className="text-teal-400 font-semibold">{stripePlan}</span></div>
              <button onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })} className="text-xl px-4 py-2 bg-teal-400 rounded text-gray-100 focus:outline-none mr-4">Toggle Theme</button>
              <button onClick={() => manageStripeSubscription(profile.uid)} className="text-xl px-4 py-2 bg-teal-400 rounded text-gray-100 focus:outline-none">Manage Subscription</button>
            </div>
            : <button onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })} className="text-xl px-4 py-2 bg-teal-400 rounded text-gray-100 focus:outline-none mr-4">Toggle Theme</button>
          }
        </div>
      }
    </Layout>
  );
}

export default IndexPage;
