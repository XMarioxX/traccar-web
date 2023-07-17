import { React, useState } from 'react';
import { useEffectAsync } from '../../reactHelper';

const TableExist = ({ deviceId, handleLoadInfo }) => {
  const [info, setInfo] = useState({});

  useEffectAsync(async () => {
    const response = await fetch(`api/devices/${deviceId}/ticket`);
    console.log(response);
    if (response.ok) {
      setInfo(await response.json());
      handleLoadInfo(info);
    } else {
      throw Error(await response.text());
    }
  }, []);

  console.log(deviceId);
  return (<div>{info.vueltas}</div>);
};

export default TableExist;
