/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, FormLabel, MenuItem, InputLabel, Select,
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditItemView from './components/EditItemView';
import { useTranslation } from '../common/components/LocalizationProvider';
import SettingsMenu from './components/SettingsMenu';
import { useCatch } from '../reactHelper';
import { groupsActions } from '../store';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const SchedulePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const daysValues = {
    lunes: 1,
    martes: 2,
    miercoles: 4,
    jueves: 8,
    viernes: 16,
    sabado: 32,
    domingo: 64,
  };

  const newDateStart = new Date();
  const [item, setItem] = useState();
  const [hoursStart, minutesStart] = ((item?.start) || '00:00').split(':');
  newDateStart.setHours(hoursStart);
  newDateStart.setMinutes(minutesStart);

  const [start, setStart] = useState(dayjs(newDateStart));
  const binaryString = (item?.days ?? 0).toString(2).padStart(7, '0'); // Convert to binary and pad with leading zeros

  const [days, setDays] = useState({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  });

  const {
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo,
  } = days;

  const [subrutas, setSubrutas] = useState([]);
  const [subruta, setSubruta] = useState(0);
  const [geofences, setGeofences] = useState([]);
  const [geofence, setGeofence] = useState(0);

  const handleChange = (event) => {
    const newDays = {
      ...days,
      [event.target.name]: event.target.checked,
    };
    setDays(newDays);
  };

  const updateStart = (newstart) => {
    setStart(dayjs(newstart));
    setItem({
      ...item,
      start: `${newstart.hour().toString().padStart(2, '0')}:${newstart.minute().toString().padStart(2, '0')}`,
    });
  };

  useEffect(() => {
    const initialDaysState = {
      lunes: binaryString.charAt(6) === '1',
      martes: binaryString.charAt(5) === '1',
      miercoles: binaryString.charAt(4) === '1',
      jueves: binaryString.charAt(3) === '1',
      viernes: binaryString.charAt(2) === '1',
      sabado: binaryString.charAt(1) === '1',
      domingo: binaryString.charAt(0) === '1',
    };
    setDays(initialDaysState);
    setStart(dayjs(newDateStart));
    fetch('/api/subroutes')
      .then((response) => response.json())
      .then((data) => setSubrutas(data));
    setSubruta(item?.subrouteId);
    fetch('/api/geofences')
      .then((response) => response.json())
      .then((data) => setGeofences(data));
    setGeofence(item?.geofenceId ?? 0);
  }, [item?.id]);

  useEffect(() => {
    const newDays = Object.entries(days)
      .filter((item) => item[1] === true)
      .reduce((sum, [day]) => sum + daysValues[day], 0);
    setItem({
      ...item,
      days: newDays,
    });
  }, [days]);

  const updateSubruta = (evt) => {
    setSubruta(evt.target.value);
    setItem({
      ...item,
      subrouteId: evt.target.value,
    });
  };

  const updateGeocerca = (evt) => {
    setGeofence(evt.target.value);
    setItem({
      ...item,
      geofenceId: evt.target.value,
    });
  };

  const onItemSaved = useCatch(async () => {
    const response = await fetch('/api/itinerarios');
    if (response.ok) {
      dispatch(groupsActions.update(await response.json()));
    } else {
      throw Error(await response.text());
    }
  });

  const validate = () => item && item.name && item.days && item.subrouteId;
  return (
    <EditItemView
      endpoint="itinerarios"
      item={item}
      setItem={setItem}
      validate={validate}
      onItemSaved={onItemSaved}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'scheduleDialog']}
    >
      {item && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {t('sharedRequired')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <TextField
              value={item.name || ''}
              onChange={(event) => setItem({ ...item, name: event.target.value })}
              label={t('sharedName')}
            />
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">{t('days')}</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={lunes} onChange={handleChange} name="lunes" />
                  }
                  label="Lunes"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={martes} onChange={handleChange} name="martes" />
                  }
                  label="Martes"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={miercoles} onChange={handleChange} name="miercoles" />
                  }
                  label="Miercoles"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={jueves} onChange={handleChange} name="jueves" />
                  }
                  label="Jueves"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={viernes} onChange={handleChange} name="viernes" />
                  }
                  label="Viernes"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={sabado} onChange={handleChange} name="sabado" />
                  }
                  label="Sabado"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={domingo} onChange={handleChange} name="domingo" />
                  }
                  label="Domingo"
                />
              </FormGroup>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subroute">{t('subroutes')}</InputLabel>
              <Select
                labelId="subrouteid-label"
                id="subrouteid"
                value={subruta ?? 0}
                label={t('subroutes')}
                onChange={updateSubruta}
              >
                {subrutas && (
                  subrutas.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="geofence">{t('geofences')}</InputLabel>
              <Select
                labelId="geofenceid-label"
                id="geofenceid"
                value={geofence ?? 0}
                label={t('geofences')}
                onChange={updateGeocerca}
              >
                {geofences && (
                  geofences.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)
                )}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker', 'TimePicker']}>
                <DemoItem>
                  <TimePicker
                    label={t('reportStartTime')}
                    value={start}
                    onChange={(newValue) => updateStart(newValue)}
                  />
                </DemoItem>

              </DemoContainer>
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>
      )}
    </EditItemView>
  );
};

export default SchedulePage;
