export default function PageTitle({ title, subtitle, badge }) {
  return (
    <div className="flex items-start gap-4">
      {badge}
      <div className="min-w-0">
        <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-xl text-ink-soft">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
