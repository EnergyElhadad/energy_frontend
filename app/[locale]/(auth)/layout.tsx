const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-Background">
      {children}
    </main>
  )
}

export default layout