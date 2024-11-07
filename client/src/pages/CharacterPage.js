import React from 'react';
import CharacterCard from '../components/CharacterCard';

const CharacterPage = () => {
    return (
        <div className="character-page">
            <CharacterCard
                name="Katya"
                image="./blythe.png"
                id="672a944476ba350ec7fafdd0"
                initialXp={0} // Set an initial XP value
                initialTasks={[]} // Set initial tasks
            />
            <CharacterCard
                name="Uuman"
                image="./patrick.jpg"
                id="672a944476ba350ec7fafdd1"
                initialXp={-10}
                initialTasks={[]}
            />
        </div>
    );
};

export default CharacterPage;
