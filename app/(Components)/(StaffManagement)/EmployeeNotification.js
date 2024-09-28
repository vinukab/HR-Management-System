import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";

const Notice = () => {
  const notices = [
    {
      date: '05 JUNE',
      title: 'Annual Retreat',
      details: 'Announcement concerning public holidays...',
    },
    {
      date: '05 JUNE',
      title: 'Annual Retreat',
      details: 'Announcement concerning public holidays...',
    }, {
      date: '05 JUNE',
      title: 'Annual Retreat',
      details: 'Announcement concerning public holidays...',
    },
  ];

  return (
    <Card className='m-1'>
      <CardHeader className='p-3 px-5'>
        <CardTitle>Notice</CardTitle>
        <CardDescription>Check the followings</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <button
            key={index}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{notice.title}</div>
                </div>
                <div className="ml-auto text-xs text-foreground">{notice.date}</div>
              </div>
              <div className="text-xs font-medium">Details</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {notice.details}
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                meeting
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                work
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                important
              </div>
            </div>
          </button>
        ))}
      </div>
      </CardContent>
    </Card>
  );
};

export default Notice;

