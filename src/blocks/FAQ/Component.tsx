"use client";

import { MinusCircle } from '@/components/Svg/Plus-Minus/MinusCircle'
import { PlusCircle } from '@/components/Svg/Plus-Minus/PlusCircle'
import React, { useState } from 'react'

type FAQItem = {
  id: string
  question: string
  answer: string // RichText content
}

type FAQBlockProps = {
  title: string
  questions: FAQItem[]
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ title, questions }) => {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>(() => {
    if (questions && questions.length > 0) {
      return { [questions[0].id]: true };
    }
    return {};
  });

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => {
      // Nếu câu hỏi được nhấp đã mở, hãy đóng nó lại.
      if (prev[id]) {
        return {};
      }
      // Nếu không, hãy mở câu hỏi được nhấp và đóng các câu hỏi khác.
      return { [id]: true };
    });
  };

  return (
    <div className="flex flex-col items-center mt-14">
      <div className='flex flex-col gap-10 max-w-[912px]'>
        <h3 className="text-[40px] leading-[60px] font-bold text-center">{title}</h3>
        <div className="flex flex-col gap-6">
          {questions?.map((item, index) => {
            const isOpen = openQuestions[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleQuestion(item.id)}
                className={`py-8 px-14 cursor-pointer rounded-3xl transition-all duration-300 ${isOpen ? 'bg-[#E7E5FF]' : "bg-[#F7F8FB]"}`}
              >
                <div className="flex justify-between items-center cursor-pointer" >
                  <span className="font-semibold text-[16px] leading-[24px]">
                    Câu hỏi {index + 1}: {item.question}
                  </span>
                  <div>
                    {isOpen ? <MinusCircle /> : <PlusCircle />}
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all ease-in-out duration-500 ${isOpen ? 'max-h-96 mt-1' : 'max-h-0'} cursor-text`}
                  // Ngăn sự kiện click lan ra phần tử cha
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Sử dụng dangerouslySetInnerHTML để render nội dung RichText (HTML) */}
                  <div
                    className="font-normal text-[16px] leading-[24px]"
                    dangerouslySetInnerHTML={{ __html: item.answer as string }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
