import React, { useState } from 'react';

 export const SettingPage = () => {
  const [theme, setTheme] = useState('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  changeTheme(newTheme)
      /*  setTheme(newTheme);
    setIsDarkMode(!isDarkMode); */
    // Add logic to apply theme to the entire application
   /*  document.documentElement.classList.toggle('dark', !isDarkMode); */
  };
  /* const themeToggle = document.getElementById("themeToggle");

  // Load saved theme from localStorage
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "light");
  themeToggle.checked = localStorage.getItem("theme") === "dark";
  
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
 */
  const changeTheme = (newTheme) => {
    document.documentElement.setAttribute("data-theme",newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };

  return (
    <div className={"min-h-screen transition-colors duration-300 dark:bg-gray-500 bg-gray-100"}>
      <div className="max-w-2xl mx-auto p-6">
        <div className={`rounded-2xl shadow-xl p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}>
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          {/* Theme Switch Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {isDarkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="font-semibold">Theme</h2>
                <p className="text-sm opacity-75">{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</p>
              </div>
            </div>
           {/*  <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                theme === "dark"? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button> */}
          <input type="checkbox" value="synthwave" id='themeToggle' className="toggle theme-controller" />
          </div>

          {/* Logout Button */}
          <div className='loggout-button-section dark:text-gray-600 border-t-1 dark:border-gray-700 boder-gray-300  text-black text-sm mt-4'>
            <p className='dark:text-white my-3'>Click this button to safely log out of your account and end your session.</p>
          <button

            onClick={handleLogout}
            className="btn btn-sm flex justify-self-end items-center justify-center space-x-1 py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200 border-0 shadow-sm shadow-gray-900"
          >
            {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg> */}
            <span>Log Out</span>
          </button>
          </div>
          {/* remove user accoutn button */}
<div className='remove-account-section dark:text-gray-600 text-black text-sm  border-t-1 dark:border-gray-700 boder-gray-300  mt-4'>
<p className='dark:text-white   my-3'>Click this button to permanently delete your account and remove all associated data</p>
<p className='pl-5 text-gray-600 '><span>NOTE:</span>This action is permanent and cannot be undone. All your data will be lost. If you're certain, click 'Delete Account' below."</p>
          <button
            onClick={handleLogout}
            className="btn btn-sm flex  justify-self-end items-center justify-center space-x-1 py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200 border-0 shadow-sm shadow-gray-900"
          >
          
            <span>Remove</span>
          </button>
</div>
          
        </div>
      </div>
    </div>
  );
};
