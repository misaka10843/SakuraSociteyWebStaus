import { useMemo } from 'react';
import Link from './link';
import Header from './header';
import UptimeRobot from './uptimerobot';
import Package from '../../package.json';

function App () {

  const apikeys = useMemo(() => {
    const { ApiKeys } = window.Config;
    if (Array.isArray(ApiKeys)) return ApiKeys;
    if (typeof ApiKeys === 'string') return [ApiKeys];
    return [];
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <div id='uptime'>
          {apikeys.map((key) => (
            <UptimeRobot key={key} apikey={key} />
          ))}
        </div>
        <div id='footer'>
          <p>基于&nbsp;<Link to='https://uptimerobot.com/' text='UptimeRobot' />&nbsp;接口&nbsp;|&nbsp;检测频率&nbsp;5&nbsp;分钟</p>
          <p>2020&nbsp;-&nbsp;2023&nbsp;&copy;&nbsp;SakuraSociety&nbsp;-&nbsp;<Link to='https://wwwsakurakoi.top' text='官网' /></p>
          <p>This page is created using <Link to='https://github.com/Qikaile/uptime-status' text='Qikaile/uptime-status' /></p>
        </div>
      </div>
    </>
  );
}

export default App;
