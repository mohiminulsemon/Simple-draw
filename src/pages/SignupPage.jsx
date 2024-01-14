import React from 'react';
import { PublicRoute, SignupForm } from '../components';

function SignupPage() {
  return (
    <PublicRoute>
      <div className="w-screen h-screen dark:bg-zinc-700 bg-zinc-100">
        {/* signup form */}
        <div className="w-full h-full flex justify-center items-center overflow-auto">
          <div className="max-w-3xl">
            <SignupForm />
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}

export default SignupPage;
