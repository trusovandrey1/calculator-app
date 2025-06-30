import styles from './Display.module.css'

interface DisplayProps {
  value: string
  equation: string
}

export default function Display({ value, equation }: DisplayProps) {
  return (
    <div className={`${styles.display} glass`}>
      {equation && (
        <div className={styles.equation}>{equation}</div>
      )}
      <div className={styles.value}>{value}</div>
    </div>
  )
}