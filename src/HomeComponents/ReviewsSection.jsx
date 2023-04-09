import React from 'react'

const ReviewsSection = () => {
  return (
    <>
        <section className='space-y-8 px-4 max-w-xl mx-auto text-[#333C4D] mt-28 hidden'>
            <a href="#" target="_blank">
                <img src="#" alt="product hunt" width="250" height="54" className="w-60 md:w-64 mx-auto"/>
            </a>
            <a className="block bg-white rounded-3xl p-4 md:p-8 cursor-pointer space-y-4 text-[#333C4D]" target="_blank" href="#">
                <div className="flex gap-4">
                    <img alt="ProductHunt user" loading="lazy" width="160" height="160" decoding="async" data-nimg="1" className="w-14 h-14 rounded-full text-transparent" srcSet="#" src="#"/>
                    <div>
                        <p className="font-medium ">Name</p>
                        <span className="text-[#333C4DCC]">@user id</span>
                    </div>
                </div>
                <div className="text-[#333C4DCC]">comment</div>
            </a>
        </section>
    </>
  )
}

export default ReviewsSection