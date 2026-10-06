/** Автотести й боти не мають потрапляти в аналітику — інакше воронка рахує нас, а не покупців. */
export const isAutomatedBrowser = (nav: { webdriver?: boolean }) => nav.webdriver === true;
