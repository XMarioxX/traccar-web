import { attsGetter, specialAtts, valueParser } from './utils';

export const test = () => { console.log(); };
export const createPopUp = (position) => {
  let html = '';
  html += "<div align='center' style='text-align: center !important;text-transform: uppercase !important;'>";
  //   if (!Traccar.app.getUser().get('attributes').hasOwnProperty('ui.disableReport') || !Traccar.app.getUser().get('attributes')['ui.disableReport']) {
  //     html += `<span class='hover tooltipNotifications'><i class='fa fa-bell' aria-hidden='true' onClick='openNotifications(${attsGetter(position, 'deviceId')})'></i></span>`;
  //     html += '<span>                                                                                 </span>';
  //     html += `<i class='fa fa-cogs' aria-hidden='true' onClick='openNotificationsConfig(${attsGetter(position, 'deviceId')})'></i>`;
  //     html += '<span>                                                                                 </span>';
  //     html += `<i class='fa fa-street-view' aria-hidden='true' onClick='openGeofences(${attsGetter(position, 'deviceId')})'></i>`;
  //   }
  html += `<h3><b>${attsGetter(position, 'name')}</b></h3></div>`;
  html += valueParser(position, specialAtts(position, 'ignition'));
  html += valueParser(position, specialAtts(position, 'motion'));
  html += valueParser(position, specialAtts(position, 'dateTime'));
  html += valueParser(position, specialAtts(position, 'status'));
  html += valueParser(position, specialAtts(position, 'direccion'));
  html += valueParser(position, specialAtts(position, 'attribute.fuel'));
  html += valueParser(position, specialAtts(position, 'attribute.totalDistance'));
  html += valueParser(position, specialAtts(position, 'speed'));
  html += valueParser(position, specialAtts(position, 'attribute.hours'));
  html += valueParser(position, specialAtts(position, 'temperaturaC')) !== '' ? valueParser(position, specialAtts(position, 'temperaturaC')) : '';
  html += valueParser(position, specialAtts(position, 'temperaturaC')) !== '' ? valueParser(position, specialAtts(position, 'temperaturaF')) : '';
  html += valueParser(position, 'bateria');
  //   html += valueParser(position, specialAtts(position, 'lastAlarm'));
  html += '<br>';
  if (true) {
    html += "<div style='display: table; margin: auto'>";
    html += "<div style='float: left; padding: 2px;' >";
    html += `<a class='link-google-maps' onclick='(function(){btnTurnOnOff("${attsGetter(position, 'deviceId')}");}());' ><img src='./././images/botones-popup/apagar.svg' width='35' height='35' style='border-radius:6px;'/></a>`;
    html += '</div>';

    html += "<div style='float: left; padding: 2px;' >";
    html += `<a class='link-google-maps' onclick='(function(){btnReactivate("${attsGetter(position, 'deviceId')}");}());' ><img src='./././images/botones-popup/encender.svg' width='35' height='35' style='border-radius:6px;'/></a>`;
    html += '</div>';

    html += "<div style='float: left; padding: 2px;' >";
    html += "<a class='link-google-maps' onclick='(function(){streetView();}());' ><img src='./././images/botones-popup/calle.svg' width='35' height='35' style='border-radius:6px;'/></a>";
    html += '</div>';

    html += "<div style='float: left; padding: 2px;'>";
    html += `<a class='link-google-maps' onclick='(function(){generateRoute("${position.latitude}","${position.logintude}");}());><img src="./././images/botones-popup/maps.svg" width="35" height="35" style="border-radius:6px;"/></a>`;
    html += '</div>';

    html += "<div style='float: left; padding: 2px;' >";
    html += "<a class='link-google-maps' onclick='Ext.fireEvent(\"reportconfig\")'><img src='./././images/botones-popup/recorrido.svg' width='35' height='35' style='border-radius:6px;'/></a>";
    html += '</div>';

    html += "<div id='divclear' style='float: left; padding:2px;' >";
    html += "<a class='link-google-maps' onclick='(function(){clearMarkers();}());'><img src='./././images/botones-popup/limpiar_recorrido.svg' width='35' height='35' style='border-radius:6px;'/></a>";
    html += '</div>';

    html += "<div id='div_replay' style='float: left; padding:2px;' >";
    html += `<a class='link-google-maps' onclick='(function(){btnReplay(${attsGetter(position, 'deviceId')});}());'><img src='./././images/botones-popup/replay.svg' width='35' height='35' style='border-radius:6px;'/></a>`;
    html += '</div>';
    html += '</div>';
  }
  return html;
};
