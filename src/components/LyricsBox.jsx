const styles = {
  container: `
    mt-6
    max-h-[400px]
    overflow-y-auto
    rounded-3xl
    border
    border-white/10
    bg-white/5
    p-6
    backdrop-blur-xl
  `,

  lyrics: `
    whitespace-pre-wrap
    break-words
    text-[17px]
    leading-9
    tracking-wide
    text-zinc-200
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