import React from 'react'
import about from '../assets/img/about.png'

const About = () => {
  return (
    <div className='pb-10'>
      <h2 className='text-center text-2xl font-semibold text-font my-10'>
        C'esy quoi GetWell ?
      </h2>
      <div className='flex flex-col md:flex-row  items-center  gap-5'>
        <div className='w-1/2'>
          <p >
            Bienvenue sur notre site de réservation de consultations médicales
            en ligne. Notre équipe est composée de professionnels passionnés de
            la santé, déterminés à faciliter l'accès aux soins médicaux de
            qualité. Nous travaillons en étroite collaboration avec les médecins
            et les cliniques les plus réputés pour vous offrir des consultations
            médicales en ligne de qualité supérieure. <br />
            <br /> Notre plateforme est conçue pour être conviviale et facile à
            utiliser. Vous pouvez facilement réserver une consultation médicale
            en ligne en choisissant le spécialiste qui correspond le mieux à vos
            besoins et en sélectionnant la date et l'heure qui vous conviennent
            le mieux. Nous sommes impatients de vous aider à prendre soin de
            votre santé et nous vous remercions de nous faire confiance pour vos
            besoins en matière de soins de santé en ligne.
          </p>
        </div>
        <div className='w-1/2'>
          <img src={about} alt='about' />
        </div>
      </div>
    </div>
  )
}

export default About
