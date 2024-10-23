
import React from 'react'
import UsersReview from './UsersReview'
import user1 from '@/assets/users/user-1.png'
import user2 from '@/assets/users/user-2.jpg'
const reviews = [
  {
    name:'Jhon',
    comment:'The case feel durable and I even got a complement on the design. Had the case for two and half month now andthe image is super clear, on the case I had before, the image starting fading into yellow-ish color after a couple weeks, love it.',
    image:user1.src,
    purchase:'Verifyied Purchase'
  }
  ,{
    name:'Josh',
    comment:'I usually keep my phone together with my keys in my pocket and that lead to some pretty heavy scratch marks on all of my last phone cases. This one, beside a barely noticable scratch on the corner, looks brand new after about half a year. I dig it',
    image:user2.src,
    purchase:'Verifyied Purchase'
  }
]
function ReviewsContainer() {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
      {
        reviews.map((review , i)=>{
          return <UsersReview 
            name={review.name} 
            image={review.image} 
            comment={review.comment} 
            purchase={review.purchase} 
            key={i}/>
        })
      }
    </div>
  )
}

export default ReviewsContainer
