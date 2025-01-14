import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import User from '../models/userModel';

const Title = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [weather, setWeather] = useState({ description: 'Loading...', icon: '' });
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [username, setUsername] = useState('Loading...');
    const [role, setRole] = useState('Loading...');
    const [profilePic, setProfilePic] = useState('');
    const [showPopup, setShowPopup] = useState(false);

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
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (location.lat && location.lon) {
                const apiKey = '11289ea409c1321f37191f21d7dc187e';
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
    });

    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return (
        <div className="bg-gray-900 flex flex-row h-24 rounded-lg m-1 p-4 shadow-lg">
            <div className="flex flex-col w-1/6 justify-center items-center m-2">
                <div className="text-xs text-gray-400 pt-2">{weather.description}</div>
                {weather.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                        alt={weather.description}
                        className="w-10 h-10"
                    />
                )}
            </div>
            <div className="border-solid border-r-2 border-gray-700"></div>
            <div className="w-1/3 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-400">{formattedDate}</div>
                <div className="text-2xl font-bold text-blue-400">{formattedTime}</div>
            </div>
            <div className="flex space-x-4 text-gray-300 ml-auto">
                <div onClick={() => setShowPopup(true)} className="cursor-pointer flex flex-row items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={profilePic} />
                    </Avatar>
                    <div className="flex flex-col text-xs">
                        <div className="font-semibold text-gray-300">@{username}</div>
                        <div className="text-xs text-gray-400">{role}</div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-300 max-w-sm w-full">
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={profilePic} />
                            </Avatar>
                            <div>
                                <h4 className="text-lg font-semibold">@{username}</h4>
                                <p className="text-sm text-gray-400">{role}</p>
                                <div className="flex items-center pt-4">
                                    <Button className="bg-blue-500 hover:bg-blue-400 text-white mr-2" onClick={signOut}>
                                        Logout
                                    </Button>
                                    <Button className="bg-red-500 hover:bg-red-400 text-white" onClick={() => setShowPopup(false)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Title;
