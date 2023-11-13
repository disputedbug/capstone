import axios from 'axios';
import React, { useState } from 'react';
import { AWS_URL } from '../const';

const NGO_Volunteer_Match = () => {
    const [ngoToVolData, setNgoToVolData] = useState([]);
    const [volToNgoData, setVolToNgoData] = useState([]);

    const fetchMatchesHandler = () => {
        axios.get(AWS_URL + '/find/ngo-vol').then(response => {
            const data = response.data;
            setNgoToVolData(data);

        });

        axios.get(AWS_URL + '/find/vol-ngo').then(response => {
            const data = response.data;
            setVolToNgoData(data);
            console.log(data)
        });
    }

    return (
        <div>
            <div>
                <button type='button' onClick={fetchMatchesHandler}>Fetch Matches</button>
            </div>
            {/* Volunteers of an NGO Section */}
            <section>
                <h2>Volunteers of an NGO</h2>
                <table>
                    <thead>
                        <tr>
                            <th>NGO Name</th>
                            <th>Field of Work</th>
                            <th>Day</th>
                            <th>Volunteers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ngoToVolData.map((ngo, index) => {
                            return (
                                ngo.volunteers.length ? (
                                    <tr key={index}>
                                        <td>{ngo.name}</td>
                                        <td>{ngo.fieldOfInterest}</td>
                                        <td>{ngo.volunteerDays}</td>
                                        <td>
                                            {ngo.volunteers.map(volunteer => {
                                                return (
                                                    <div>
                                                        <span>{volunteer.name}</span>
                                                        <span>{volunteer.email}</span>
                                                    </div>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                )
                                    : null

                            )
                        })}

                    </tbody>
                </table>
            </section>

            {/* NGOs for a Volunteer Section */}
            <section>
                <h2>NGOs for a Volunteer</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Volunteer Name</th>
                            <th>Field of Work</th>
                            <th>Day</th>
                            <th>NGOs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volToNgoData.map((volunteer, index) => {
                            return (
                                volunteer.ngos.length ? (
                                    <tr key={index}>
                                        <td>{volunteer.name}</td>
                                        <td>{volunteer.fieldOfInterest}</td>
                                        <td>{volunteer.volunteerDays}</td>
                                        <td>
                                            {
                                                volunteer.ngos.map(ngo => {
                                                    return (
                                                        <div>
                                                            <span>{ngo.name}</span>
                                                            <span>{ngo.email}</span>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </td>
                                    </tr>
                                )
                                    : null
                            )
                        })}

                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default NGO_Volunteer_Match;
