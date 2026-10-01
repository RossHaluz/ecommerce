/** `<` екрануємо, щоб текст із бази (назва товару) не міг закрити тег </script>. */
const serialize = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serialize(data) }}
  />
);
