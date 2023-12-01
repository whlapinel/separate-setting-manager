export default function Footer() {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer>
      <h4>&copy; Will Lapinel {copyrightYear}</h4>
    </footer>
  );
}
