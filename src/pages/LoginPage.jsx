import React from 'react';
import { LoginForm, PublicRoute } from '../components';

function LoginPage() {
  return (
    <PublicRoute>
      <div className="w-screen h-screen dark:bg-zinc-700 bg-zinc-100">
        {/* login form */}
        <div className="w-full h-full flex justify-center items-center overflow-auto">
          <div className="max-w-3xl">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}

export default LoginPage;
