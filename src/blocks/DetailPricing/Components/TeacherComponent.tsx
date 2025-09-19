"use client"

import Button from "@/common/Button";
import CheckBox from "@/components/Svg/CheckBox";
import WarningBox from "@/components/Svg/WarningBox";
import Image from "next/image";
import ICON_GIFT from "@/assets/icons/gift.svg";

type Props = {
  packages: any[];
  features: any[];
  warning: any[];
  type: string;
  isDiscount?: boolean;
  discountNote?: string;
  discountPeriod?: {
    startDate: string;
    endDate: string;
  };
  countdownMessage: string;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  formatMoney: (amount: number | string) => string;
  totalPrices: (discountPrice: string, duration: string) => string;
  rendertype: (type: string) => string;
}
export const TeacherComponent = (props: Props) => {
  const { packages, features, warning, type, isDiscount, discountNote, countdownMessage, timeLeft } = props;
  const { formatMoney, totalPrices, rendertype } = props;

  return (
    <div className="grid grid-cols-3 gap-6">
      {packages?.map((pkg, index) => (
        <div key={index}
          className='p-6 flex flex-col gap-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] bg-white'
        >
          <div className="flex flex-col gap-4 h-full">
            <div className={`flex flex-col gap-4 ${pkg.discountPrice === '0' ? '' : 'h-full'}`}>
              <div className="flex flex-col gap-2 items-center">
                {pkg.discountPrice === '0' ? (
                  <h4 className="font-medium text-[#3A18CE] leading-[24px]">FREE</h4>
                ) : type === 'base' ? (
                  <h4 className="font-medium text-[#3A18CE] leading-[24px]">{pkg.duration} THÁNG</h4>
                ) : (
                  <h4 className="font-medium text-[#3A18CE] leading-[24px]">{pkg.submissions} LƯỢT CHẤM</h4>
                )}

                <div className="flex gap-2 items-end">
                  {pkg.originalPrice !== '0' &&
                    <span className="font-semibold text-red-500 line-through">{formatMoney(pkg.originalPrice)}</span>
                  }
                  <span className="font-semibold text-black text-[24px] leading-[30px]">{formatMoney(pkg.discountPrice)}</span>
                  <span className="font-semibold">{pkg.currency}</span>
                </div>
                {(pkg.duration !== "1" && pkg.originalPrice !== '0') && (
                  <span className="text-[14px] leading-[20px]">
                    x {pkg.duration || pkg.submissions} {rendertype(type)} = {totalPrices(pkg.discountPrice, pkg.duration || pkg.submissions)} {pkg.currency}
                  </span>
                )}
              </div>
              {pkg.originalPrice === '0' && (
                <div className='bg-[#E8EAEd] h-[1px] w-full'></div>
              )}
              {isDiscount && pkg.originalPrice !== '0' && (
                <div className='mt-auto py-2 px-4 flex flex-col gap-2 items-center rounded-[16px] bg-[#FFF5EA] border border-[#FF9928]'>
                  <div className='flex flex-col gap-1 items-center'>
                    <Image
                      src={ICON_GIFT}
                      alt=''
                    />
                    <div className='flex flex-col gap-1 items-center'>
                      <span className='text-[12px] leading-[16px]'>
                        {countdownMessage}
                      </span>
                      <h4 className='text-[22px] leading-[30px] font-semibold'>
                        {`${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`}
                      </h4>
                    </div>
                  </div>
                  <div className='flex max-w-[250px] px-4 py-[10px] rounded-[12px] bg-[#FFFBF6] border border-[#FFE4B9]'>
                    <p className='text-[12px] text-center leading-[16px] font-semibold text-[#0A0A0A]'>
                      {discountNote}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {pkg.originalPrice === '0' ? (
                <div key={index} className="flex gap-2">
                  <CheckBox />
                  <p className="max-w-[194px] font-normal text-[14px] leading-[20px] -mt-1">
                    5 lượt chấm: Writing, Speaking Feedback & IELTS Speaking
                  </p>
                </div>
              ) : (
                <>
                  {features?.map((feature, index) => {
                    return (
                      <div key={index} className="flex gap-2">
                        <CheckBox />
                        <p className="max-w-[194px] font-normal text-[14px] leading-[20px] -mt-1">{feature.feature}</p>
                      </div>
                    )
                  })}
                </>
              )}
              {pkg.originalPrice !== '0' &&
                <>
                  {warning?.map((warning, index) => {
                    return (
                      <div key={index} className="flex gap-2">
                        <WarningBox />
                        <p className="max-w-[194px] font-normal text-[14px] leading-[20px] -mt-1">{warning.warningText}</p>
                      </div>
                    )
                  })}
                </>
              }

            </div>
          </div>
          <Button variant='navy' size='md'
            onClick={() => window.location.href = pkg.ctaUrl || '#'}
            style={{
              backgroundColor: pkg.ctaColor
            }}
          >
            {pkg.ctaText || 'MUA NGAY'}
          </Button>
        </div>
      ))}
    </div>
  );
};               