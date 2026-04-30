export const highlightText = (text: string, search: string) => {
  if (!search) return text;

  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearch})`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-300 font-semibold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};
