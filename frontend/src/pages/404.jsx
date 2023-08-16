import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      {/*
              This example requires updating your template:
      
              ```
              <html class="h-full">
              <body class="h-full">
              ```
            */}
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button>
              <Link
                to={`${import.meta.env.VITE_API_ADDRESS}/`}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Seguridad Social
              </Link>
            </button>

            <a
              href="https://support.plena-global.com"
              className="text-sm font-semibold text-gray-900"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error404;
