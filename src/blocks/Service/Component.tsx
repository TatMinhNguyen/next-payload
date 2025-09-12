'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Button from '@/common/Button'

type Media = {
  url: string
  alt?: string
  width: number
  height: number
}

type Content = {
  title: string
  description: string
  icon?: Media
}

type ServiceItem = {
  title: string
  image: Media
  contents: Content[]
  videoUrl: string
  buttonContent: string
}

type ServiceBlockProps = {
  title: string
  subtitle?: string
  role?: { title: string, selectedRole: string }[]
  students: ServiceItem[]
  teachers: ServiceItem[]
}

export default function ServiceBlock({
  title,
  subtitle,
  role,
  students,
  teachers,
}: ServiceBlockProps) {
  const [selectRole, setSelectRole] = useState("student");
  // Student slider state
  const [currentStudentSlide, setCurrentStudentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [loadingStudentVideo, setLoadingStudentVideo] = useState<number | null>(null);
  const [showStudentVideo, setShowStudentVideo] = useState<number | null>(null);

  // Teacher slider state
  const [currentTeacherSlide, setCurrentTeacherSlide] = useState(1);
  const [teacherTransitionEnabled, setTeacherTransitionEnabled] = useState(true);
  const [isTeacherHovering, setIsTeacherHovering] = useState(false);
  const [loadingTeacherVideo, setLoadingTeacherVideo] = useState<number | null>(null);
  const [showTeacherVideo, setShowTeacherVideo] = useState<number | null>(null);

  const preloadedUrls = useRef(new Set<string>());

  const handlePreload = useCallback((url: string) => {
    if (!url || preloadedUrls.current.has(url)) {
      return;
    }
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'document';
      link.href = url;
      document.head.appendChild(link);
      preloadedUrls.current.add(url);
    } catch (error) {
      console.error("Failed to preload URL:", error);
    }
  }, []);
  const TOTAL_STUDENT_SLIDES = students.length;

  const extendedStudentDatas = useMemo(() => {
    if (TOTAL_STUDENT_SLIDES === 0) return [];
    const firstSlide = students[0];
    const lastSlide = students[TOTAL_STUDENT_SLIDES - 1];
    return [lastSlide, ...students, firstSlide];
  }, [students]);

  const TOTAL_TEACHER_SLIDES = teachers.length;

  const extendedTeacherDatas = useMemo(() => {
    if (TOTAL_TEACHER_SLIDES === 0) return [];
    const firstSlide = teachers[0];
    const lastSlide = teachers[TOTAL_TEACHER_SLIDES - 1];
    return [lastSlide, ...teachers, firstSlide];
  }, [teachers]);

  const handleNextSlide = useCallback(() => {
    if (!transitionEnabled) return;
    setCurrentStudentSlide(prev => prev + 1);
  }, [transitionEnabled]);

  const handleNextTeacherSlide = useCallback(() => {
    if (!teacherTransitionEnabled) return;
    setCurrentTeacherSlide(prev => prev + 1);
  }, [teacherTransitionEnabled]);


  const handleTransitionEnd = () => {
    if (currentStudentSlide <= 0) {
      setTransitionEnabled(false);
      setCurrentStudentSlide(TOTAL_STUDENT_SLIDES);
    } else if (currentStudentSlide >= TOTAL_STUDENT_SLIDES + 1) {
      setTransitionEnabled(false);
      setCurrentStudentSlide(1);
    }
  };

  const handleTeacherTransitionEnd = () => {
    if (currentTeacherSlide <= 0) {
      setTeacherTransitionEnabled(false);
      setCurrentTeacherSlide(TOTAL_TEACHER_SLIDES);
    } else if (currentTeacherSlide >= TOTAL_TEACHER_SLIDES + 1) {
      setTeacherTransitionEnabled(false);
      setCurrentTeacherSlide(1);
    }
  };

  useEffect(() => {
    if (isHovering || showStudentVideo !== null || loadingStudentVideo !== null || !transitionEnabled || selectRole !== 'student') return;

    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, transitionEnabled, selectRole, handleNextSlide, showStudentVideo, loadingStudentVideo]);

  useEffect(() => {
    if (isTeacherHovering || showTeacherVideo !== null || loadingTeacherVideo !== null || !teacherTransitionEnabled || selectRole !== 'teacher') return;
    const interval = setInterval(() => { handleNextTeacherSlide() }, 5000);
    return () => clearInterval(interval);
  }, [isTeacherHovering, teacherTransitionEnabled, selectRole, handleNextTeacherSlide, showTeacherVideo, loadingTeacherVideo]);

  useEffect(() => {
    if (loadingStudentVideo !== null) {
      setShowStudentVideo(loadingStudentVideo);
      if (showStudentVideo === loadingStudentVideo) {
        const timer = setTimeout(() => {
          setLoadingStudentVideo(null);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [loadingStudentVideo, showStudentVideo]);

  useEffect(() => {
    if (loadingTeacherVideo !== null) {
      setShowTeacherVideo(loadingTeacherVideo);
      if (showTeacherVideo === loadingTeacherVideo) {
        const timer = setTimeout(() => {
          setLoadingTeacherVideo(null);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [loadingTeacherVideo, showTeacherVideo]);

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => setTransitionEnabled(true), 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  useEffect(() => {
    if (!teacherTransitionEnabled) {
      const timer = setTimeout(() => setTeacherTransitionEnabled(true), 50);
      return () => clearTimeout(timer);
    }
  }, [teacherTransitionEnabled]);

  useEffect(() => {
    if (selectRole === "student") {
      setCurrentStudentSlide(1);
      setTransitionEnabled(true);
      setShowStudentVideo(null);
      setLoadingStudentVideo(null);
    } else if (selectRole === "teacher") {
      setCurrentTeacherSlide(1);
      setTeacherTransitionEnabled(true);
      setShowTeacherVideo(null);
      setLoadingTeacherVideo(null);
    }
  }, [selectRole]);


  return (
    <section className="flex flex-col items-center gap-8 mt-14 pb-14">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full flex items-center justify-center">
          <div className="text-[150px] leading-[150px] text-[#f6f7fc] font-[900] select-none">
            {subtitle}
          </div>
          <h3 className="absolute top-[33%] text-[40px] leading-[60px] font-bold">
            {title}
          </h3>
        </div>
        {role && (
          <div className="flex gap-6 mt-6">
            {role.map((r, i) => (
              <Button
                key={i}
                onClick={() => setSelectRole(r.selectedRole)}
                variant={selectRole === `${r.selectedRole}` ? "navy" : "primary"} size="md"
              >
                {r.title}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className='relative w-[96vw]'>
        {/* Student View */}
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`transition-opacity duration-500 ease-in-out ${selectRole === 'student' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute w-full top-0'
            }`}
        >
          <div className='overflow-hidden rounded-[32px]'>
            <div
              className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentStudentSlide * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedStudentDatas.map((item, index) => (
                <div key={index}
                  className='bg-gradient-to-b from-[#3A18CE] to-[#8E74FF] h-[638px] rounded-4xl py-[56px] px-[159px] flex gap-5 items-center w-full flex-shrink-0'
                >
                  <div className='flex flex-col gap-6 w-[424px] '>
                    <h3 className='text-[40px] leading-[60px] font-semibold text-white'>{item.title}</h3>
                    {item.contents?.map((content, index) => (
                      <div key={index} className='flex gap-4 items-center'>
                        <Image src={content.icon?.url as string} alt={content.title} width={content.icon?.width} height={content.icon?.height} />
                        <span className='font-bold text-white'>
                          {content.title} - <span className='font-normal text-white'>{content.description}</span>
                        </span>
                      </div>
                    ))}
                    <Button variant='primary' size='md' className='text-[20px] leading-[27px] w-[200px] pb-3'
                      onClick={() => window.location.href = "https://app.clickee.ai"}
                    >
                      Đăng ký ngay
                    </Button>
                  </div>
                  <div className="relative flex-shrink-0 flex items-center justify-center">
                    {loadingStudentVideo === index && currentStudentSlide === index && (
                      <div
                        className="absolute inset-0 w-[700px] h-[394px] bg-black rounded-3xl"
                        aria-label="Loading video"
                      ></div>
                    )}
                    {showStudentVideo === index && currentStudentSlide === index ? (
                      <iframe
                        src={`${item.videoUrl}?autoplay=1&rel=0`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-[700px] h-[394px] rounded-3xl"
                      ></iframe>
                    ) : (
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        className='cursor-pointer'
                        width={item.image.width}
                        height={item.image.height}
                        priority={index === 1}
                        onMouseEnter={() => handlePreload(`${item.videoUrl}?autoplay=1&rel=0`)}
                        onClick={() => setLoadingStudentVideo(index)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-6">
            {students.map((_, index) => {
              const activeDotIndex = (currentStudentSlide - 1 + TOTAL_STUDENT_SLIDES) % TOTAL_STUDENT_SLIDES;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentStudentSlide(index + 1)}
                  className={`w-6 h-6 rounded-full transition-colors duration-300 cursor-pointer ${activeDotIndex === index ? 'bg-[#3A18CE]' : 'bg-[#C8E3FF] hover:bg-[#3A18EE]'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Teacher View */}
        <div
          onMouseEnter={() => setIsTeacherHovering(true)}
          onMouseLeave={() => setIsTeacherHovering(false)}
          className={`transition-opacity duration-500 ease-in-out ${selectRole === 'teacher' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute w-full top-0'
            }`}
        >
          <div className='overflow-hidden rounded-[32px]'>
            <div
              className={`flex ${teacherTransitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentTeacherSlide * 100}%)` }}
              onTransitionEnd={handleTeacherTransitionEnd}
            >
              {extendedTeacherDatas.map((item, index) => (
                <div key={index}
                  className='bg-gradient-to-b from-[#3A18CE] to-[#8E74FF] h-[638px] rounded-4xl py-[56px] px-[159px] flex gap-5 items-center w-full flex-shrink-0'
                >
                  <div className='flex flex-col gap-6 w-[424px] '>
                    <h3 className='text-[40px] leading-[60px] font-semibold text-white'>{item.title}</h3>
                    {item.contents?.map((content, index) => (
                      <div key={index} className='flex gap-4 items-center'>
                        <Image src={content.icon?.url as string} alt={content.title} width={content.icon?.width} height={content.icon?.height} />
                        <span className='font-bold text-white'>
                          {content.title} - <span className='font-normal text-white'>{content.description}</span>
                        </span>
                      </div>
                    ))}
                    <Button variant='primary' size='md' className='text-[20px] leading-[27px] w-[200px] pb-3'
                      onClick={() => window.location.href = "https://app.clickee.ai"}
                    >
                      Đăng ký ngay
                    </Button>
                  </div>
                  <div className="relative flex-shrink-0 flex items-center justify-center">
                    {loadingTeacherVideo === index && currentTeacherSlide === index && (
                      <div
                        className="absolute inset-0 w-[700px] h-[394px] bg-black rounded-3xl"
                        aria-label="Loading video"
                      ></div>
                    )}
                    {showTeacherVideo === index && currentTeacherSlide === index ? (
                      <iframe
                        src={`${item.videoUrl}?autoplay=1&rel=0`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-[700px] h-[394px] rounded-3xl"
                      ></iframe>
                    ) : (
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        className='cursor-pointer'
                        width={item.image.width}
                        height={item.image.height}
                        priority={index === 1}
                        onMouseEnter={() => handlePreload(`${item.videoUrl}?autoplay=1&rel=0`)}
                        onClick={() => setLoadingTeacherVideo(index)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-6">
            {teachers.map((_, index) => {
              const activeDotIndex = (currentTeacherSlide - 1 + TOTAL_TEACHER_SLIDES) % TOTAL_TEACHER_SLIDES;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentTeacherSlide(index + 1)}
                  className={`w-6 h-6 rounded-full transition-colors duration-300 cursor-pointer ${activeDotIndex === index ? 'bg-[#3A18CE]' : 'bg-[#C8E3FF] hover:bg-[#3A18EE]'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
