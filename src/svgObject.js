import React from 'react';
import ClearDayIcon from './components/SvgComponents/ClearDayIcon';
import CloudsDayIcon from './components/SvgComponents/CloudsDayIcon';
import DrizzleDayIcon from './components/SvgComponents/DrizzleDayIcon';
import RainDayIcon from './components/SvgComponents/RainDayIcon';
import MistDayIcon from './components/SvgComponents/MistDayIcon';
import SnowDayIcon from './components/SvgComponents/SnowDayIcon';
import ThunderstormDayIcon from './components/SvgComponents/ThunderstormDayIcon';

import ClearNightIcon from './components/SvgComponents/ClearNightIcon';
import CloudsNightIcon from './components/SvgComponents/CloudsNightIcon';
import DrizzleNightIcon from './components/SvgComponents/DrizzleNightIcon';
import RainNightIcon from './components/SvgComponents/RainNightIcon';
import MistNightIcon from './components/SvgComponents/MistNightIcon';
import SnowNightIcon from './components/SvgComponents/SnowNightIcon';
import ThunderstormNightIcon from './components/SvgComponents/ThunderstormNightIcon';


const svgObject = {
    'Clear':{
        'day': <ClearDayIcon />,
        'night': <ClearNightIcon />
    },

    'Clouds':{
        'day': <CloudsDayIcon />,
        'night': <CloudsNightIcon />
    },

    'Rain':{
        'day': <RainDayIcon />,
        'night': <RainNightIcon />
    },

    'Drizzle':{
        'day': <DrizzleDayIcon />,
        'night': <DrizzleNightIcon />
    },

    'Thunderstorm':{
        'day': <ThunderstormDayIcon />,
        'night': <ThunderstormNightIcon />
    },

    'Snow':{
        'day': <SnowDayIcon />,
        'night': <SnowNightIcon />
    },

    'Mist':{
        'day': <MistNightIcon />,
        'night': <MistNightIcon />
    },

    'Atmosphere':{
        'day': <MistDayIcon />,
        'night': <MistNightIcon />
    }
    


}

export default svgObject;