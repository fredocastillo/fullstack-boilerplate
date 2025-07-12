export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-6 py-3 flex justify-center items-center">
        <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
          © {currentYear} Enterprise Corp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
