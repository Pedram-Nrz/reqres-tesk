import LoginFormAction from "@/app/actions/LoginFormAction.ts"; 
import LoginForm from "@/app/ui/components/LoginForm.tsx";

export default function LoginPage() { 
    return (
      <div className="lg:h-full flex flex-col justify-end gap-4 lg:gap-8 py-20 pl-12 lg:pb-40 lg:pl-20">
        <div className="text-white">
            <div className="font-normal text-xs sm:text-sm lg:text-base">welcome to</div>
            <div className="font-semibold text-lg sm:text-xl lg:text-3xl capitalize">secret santas club</div>
        </div>
         <LoginForm action={LoginFormAction}/>
      </div>
    );
}

