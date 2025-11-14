export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <div className="text-sm font-medium text-muted-foreground">
          Preparing the experience…
        </div>
      </div>
    </div>
  );
}

