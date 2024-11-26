import { CustomResponse, HttpError, useCustom } from '@refinedev/core';
import { useState } from 'react';
import { ResponseSubjectsLocationLatest } from '../../interfaces';
import { API_URL } from '../../providers';

export const useGetLatestLocations = () => { 
    const { data, error } = useCustom<ResponseSubjectsLocationLatest>({
        url: `${API_URL}/api/subjects/latest-locations/`,
        method: "get",
    });

    return { data, error};
};

