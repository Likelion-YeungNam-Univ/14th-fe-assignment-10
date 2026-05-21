const styles = {

  container: `
    mt-6
    max-h-[600px]
    overflow-y-auto
    rounded-3xl
    border
    border-zinc-200
    bg-gray-100
    p-6
    shadow-sm
    backdrop-blur-xl
  `,
  lyrics: `
    whitespace-pre-wrap
    break-words
    text-[17px]
    leading-9
    tracking-wide
    text-zinc-800
  `,

};

function LyricsBox({ lyrics }) {
  return (
    <div className={styles.container}>
      <pre className={styles.lyrics}>
        {lyrics}
      </pre>
    </div>
  );
}

export default LyricsBox;