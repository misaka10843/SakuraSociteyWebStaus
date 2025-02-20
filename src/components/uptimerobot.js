import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { GetMonitors } from '../common/uptimerobot';
import { formatDuration, formatNumber } from '../common/helper';
import Link from './link';

function UptimeRobot({ apikey }) {

  const status = {
    ok: '正常',
    down: '无法访问',
    unknow: '状态未知'
  };

  const { CountDays, ShowLink } = window.Config;

  const [monitors, setMonitors] = useState();

  useEffect(() => {
    GetMonitors(apikey, CountDays).then(setMonitors);
  }, [apikey, CountDays]);

  if (monitors) return monitors.map((site) => (
    <div key={site.id} className='site'>
      <div className='meta'>
        <span className='name' dangerouslySetInnerHTML={{ __html: site.name }} />
        {ShowLink && site.name != "主服务器" && site.name != "樱雪恋歌API系统"&&<Link className='link' to={site.url} text={site.name} />}
        <span className={'status ' + site.status}>{status[site.status]}</span>
      </div>
      <div className='timeline'>
        {site.daily.map((data, index) => {
          let status = '';
          let text = data.date.format('YYYY-MM-DD ');
          if (data.uptime >= 100) {
            status = 'ok';
            text += `可用率 ${formatNumber(data.uptime)}%`;
          }
          else if (data.uptime <= 0 && data.down.times === 0) {
            status = 'none';
            text += '无数据';
          }
          else {
            status = 'down';
            text += `故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${formatNumber(data.uptime)}%`;
          }
          return (<i key={index} className={status} data-tip={text} />)
        })}
      </div>
      <div className='summary'>
        <span className='summary-now'>今天</span>
        <span className='summary-note'>
          {site.total.times
            ? `最近 ${CountDays} 天内故障 ${site.total.times} 次，累计 ${formatDuration(site.total.duration)}，平均可用率 ${site.average}%`
            : `最近 ${CountDays} 天内可用率 ${site.average}%`}
        </span>
        <span className='summary-day'>{site.daily[site.daily.length - 1].date.format('YYYY-MM-DD')}</span>
      </div>
      <ReactTooltip className='tooltip' place='top' type='dark' effect='solid' />
    </div>
  ));

  else return (
    <div className='site'>
      <div className='loading' />
    </div>
  );
}

export default UptimeRobot;
