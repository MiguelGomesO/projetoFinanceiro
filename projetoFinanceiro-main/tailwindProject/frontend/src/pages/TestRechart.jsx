// 'use client';

import { useEffect, useState } from 'react';
import { RiCloseLine } from '@remixicon/react';
import { AreaChart, Card, List, ListItem } from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    date: 'Jan 23',
    Organic: 232,
    Sponsored: 0,
  },
  {
    date: 'Feb 23',
    Organic: 241,
    Sponsored: 0,
  },
  {
    date: 'Mar 23',
    Organic: 291,
    Sponsored: 0,
  },
  {
    date: 'Apr 23',
    Organic: 101,
    Sponsored: 0,
  },
  {
    date: 'May 23',
    Organic: 318,
    Sponsored: 0,
  },
  {
    date: 'Jun 23',
    Organic: 205,
    Sponsored: 0,
  },
  {
    date: 'Jul 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Aug 23',
    Organic: 341,
    Sponsored: 0,
  },
  {
    date: 'Sep 23',
    Organic: 387,
    Sponsored: 120,
  },
  {
    date: 'Oct 23',
    Organic: 220,
    Sponsored: 0,
  },
  {
    date: 'Nov 23',
    Organic: 372,
    Sponsored: 0,
  },
  {
    date: 'Dec 23',
    Organic: 321,
    Sponsored: 0,
  },
];

const summary = [
  {
    name: 'Organic',
    value: 3273,
  },
  {
    name: 'Sponsored',
    value: 120,
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const statusColor = {
  Organic: 'bg-blue-500',
  Sponsored: 'bg-violet-500',
};

export default function Example() {
  const [isOpen, setIsOpen] = useState(true);

  // just for demo purpose
  useEffect(() => {
    let timeoutId;

    if (!isOpen) {
      timeoutId = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Follower metrics
        </h3>
        <AreaChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored']}
          colors={['blue', 'violet']}
          showLegend={false}
          showYAxis={false}
          showGridLines={true}
          showGradient={false}
          startEndOnly={true}
          className="mt-6 h-48"
        />
        <List className="mt-2">
          {summary.map((item) => (
            <ListItem key={item.name}>
              <div className="flex items-center space-x-2">
                <span
                  className={classNames(statusColor[item.name], 'h-0.5 w-3')}
                />
                <span>{item.name}</span>
              </div>
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {valueFormatter(item.value)}
              </span>
            </ListItem>
          ))}
        </List>
        {isOpen ? (
          <div className="mt-3 rounded-tremor-small bg-tremor-background-muted py-3 pl-4 pr-2 ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background-subtle dark:ring-dark-tremor-ring">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  More power?{' '}
                  <a
                    href="#"
                    className="font-normal text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand"
                  >
                    Upgrade
                  </a>{' '}
                  <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
                    to get more insights.
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="rounded-tremor-small p-1 text-tremor-content-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:text-tremor-content"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
              </button>
            </div>
          </div>
        ) : null}
      </Card>
    </>
  );
}