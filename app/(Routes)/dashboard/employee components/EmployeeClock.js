import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import User from '../../../models/userModel';

const EmployeeClock = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [weather, setWeather] = useState({ description: 'Loading...', icon: '' });
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [username, setUsername] = useState('Loading...');
    const [role, setRole] = useState('Loading...');
    const [profilePic, setProfilePic] = useState('');
    
    const router = useRouter();

    const signOut = async () => {
        try {
            await User.logout();
            router.push('/');
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userProfileTemp = await User.getuserProfile();
                const userRole = await User.getRole();
                const userUsername = await User.getUsername();
                setUsername(userUsername);
                setRole(userRole);
                setProfilePic(userProfileTemp);
            } catch (error) {
                console.error('Error during fetching user details:', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        });
                    },
                    (error) => {
                        console.error("Geolocation error: ", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };
        getLocation();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clean up on unmount
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (location.lat && location.lon) {
                const apiKey = '11289ea409c1321f37191f21d7dc187e'; // Replace with your OpenWeatherMap API key
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`);

                    if (!response.ok) {
                        console.error("Failed to fetch weather data:", response.statusText);
                        return;
                    }

                    const data = await response.json();
                    if (data.weather && data.weather.length > 0) {
                        setWeather({
                            description: data.weather[0].description,
                            icon: data.weather[0].icon,
                        });
                    } else {
                        console.warn("No weather information available.");
                    }
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }
        };

        fetchWeather();
    }, [location]);

    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return ( 
        <div className="bg-gradient-to-r from-yellow-600 to-red-600 flex flex-row h-24 rounded-lg m-1 p-4">
            <div className="flex flex-col w-1/6 justify-center items-center m-2">
                <div className="text-xs text-gray-700 pt-2">{weather.description}</div>
                {weather.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                        alt={weather.description}
                        className="w-10 h-10"
                    />
                )}
            </div>
            <div className="border-solid border-r-2 border-neutral-900"></div>
            <div className="w-1/3 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-900">{formattedDate}</div>
                <div className="text-2xl font-bold">{formattedTime}</div>
            </div>
            <div className="flex space-x-4 text-gray-600 ml-auto">
                <Popover>
                    <PopoverTrigger>
                        <div className="flex flex-row items-center space-x-2">
                            <Avatar>
                                <AvatarImage src={profilePic} />
                            </Avatar>
                            <div className="flex flex-col text-xs">
                                <div className="font-semibold">@{username}</div>
                                <div className="text-xs">{role}</div>
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-50 -ml-12">
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarImage src={profilePic} />
                            </Avatar>
                            <div>
                                <h4 className="text-sm font-semibold">@{username}</h4>
                                <p className="text-sm">{role}</p>
                                <div className="flex items-center pt-2">
                                    <Button onClick={signOut}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default EmployeeClock;
