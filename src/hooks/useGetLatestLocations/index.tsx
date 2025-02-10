import { CustomResponse, HttpError, useCustom, useNotification } from '@refinedev/core';
import { useState } from 'react';
import { ResponseSubjectsLocationLatest } from '../../interfaces';
import { API_URL } from '../../providers';
import { start } from 'repl';

export const useGetLatestLocations = (subjectId?: string, startDate?: string, endDate?: string) => {
    const { open } = useNotification();
    
    let url: string
    if (subjectId && startDate && endDate) {
        url = `${API_URL}/api/subjects/latest-locations/?subject_id=${subjectId}&start_date=${startDate}&end_date=${endDate}`
    } else {
        url = `${API_URL}/api/subjects/latest-locations/`
    }

    const createNotificationErrorMessage = () => {
        if(url !== `${API_URL}/api/subjects/latest-locations/`){
            return `Could not find location history for subject with id ${subjectId} between ${startDate} and ${endDate}`
        }

        return "No location data found"
    }
    
    const { data, error } = useCustom<ResponseSubjectsLocationLatest>({
        url,
        method: "get",
        queryOptions: {
            onSuccess: (data) => {
                if (!data.data || data.data.total === 0) {
                    if(open){
                        open({
                            type: "error",
                            message: createNotificationErrorMessage(),
                        });
                    }
                }
            },
        },
    });
    
    return { data, error};
};
