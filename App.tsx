
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ResultsPlaceholder from './components/ResultsPlaceholder';
import SummarySection from './components/SummarySection';
import DetailedBreakdownSection from './components/DetailedBreakdownSection';
import { Complexity, CalculationResult, Activity, Responsible, DetailedActivityBreakdown } from './types';
import { ACTIVITIES_DATA, HOURS_PER_WORKDAY, THEME_HEX_COLORS } from './constants';
import { useTheme } from './contexts/ThemeContext';


const App: React.FC = () => {
  const { theme } = useTheme(); 
  const colors = THEME_HEX_COLORS[theme];

  const [courseName, setCourseName] = useState<string>('');
  const [courseCode, setCourseCode] = useState<string>('');
  const [numModules, setNumModules] = useState<number | string>(0);
  const [complexity, setComplexity] = useState<Complexity>(Complexity.Alta);
  const [startDate, setStartDate] = useState<string>(''); // Added for start date

  const [numDiDesigners, setNumDiDesigners] = useState<number | string>(1);
  const [numDgDesigners, setNumDgDesigners] = useState<number | string>(1);
  
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);


  const calculateHours = useCallback(() => {
    if (numModules === "" || Number(numModules) < 0 || isNaN(Number(numModules))) {
        alert("Por favor, ingrese un número válido de módulos técnicos (0 o mayor).");
        setIsCalculating(false);
        return;
    }
    
    setIsCalculating(true);
    
    const diDesignersForCalc = Number(numDiDesigners) > 0 ? Number(numDiDesigners) : 1;
    const dgDesignersForCalc = Number(numDgDesigners) > 0 ? Number(numDgDesigners) : 1;

    if (Number(numDiDesigners) <= 0 || isNaN(Number(numDiDesigners))) setNumDiDesigners(1);
    if (Number(numDgDesigners) <= 0 || isNaN(Number(numDgDesigners))) setNumDgDesigners(1);
    
    setTimeout(() => {
      let totalHours = 0;
      let diMultimediaHours = 0;
      let dgHours = 0;
      const detailedBreakdown: DetailedActivityBreakdown[] = [];
      const actualNumModules = Number(numModules);

      ACTIVITIES_DATA.forEach((activity: Activity) => {
        let activityTime = 0;
        switch (complexity) {
          case Complexity.Alta:
            activityTime = activity.timeAlta;
            break;
          case Complexity.Media:
            activityTime = activity.timeMedia;
            break;
          case Complexity.Baja:
            activityTime = activity.timeBaja;
            break;
        }

        const currentActivityHours = activity.multipliedByModule ? activityTime * actualNumModules : activityTime;
        
        if(currentActivityHours > 0) { 
            detailedBreakdown.push({
                id: activity.id,
                name: activity.name,
                calculatedHours: currentActivityHours,
                responsible: activity.responsible,
            });
        }

        totalHours += currentActivityHours;

        if (activity.responsible === Responsible.DI_Multimedia) {
          diMultimediaHours += currentActivityHours;
        } else if (activity.responsible === Responsible.DG) {
          dgHours += currentActivityHours;
        }
      });
      
      detailedBreakdown.sort((a,b) => b.calculatedHours - a.calculatedHours);

      const totalEffortWorkdays = totalHours > 0 ? totalHours / HOURS_PER_WORKDAY : 0;

      const diEffortDays = diMultimediaHours / HOURS_PER_WORKDAY;
      const dgEffortDays = dgHours / HOURS_PER_WORKDAY;

      const calendarDaysForDI = diEffortDays > 0 ? diEffortDays / diDesignersForCalc : 0;
      const calendarDaysForDG = dgEffortDays > 0 ? dgEffortDays / dgDesignersForCalc : 0;
      
      const effectiveWorkdaysForCompletionDate = Math.max(calendarDaysForDI, calendarDaysForDG);

      let estimatedCompletionDateString: string | null = null;
      if (startDate && effectiveWorkdaysForCompletionDate >= 0) {
        const initialDateObj = new Date(startDate + 'T00:00:00'); // Use local time midnight
        let currentDateForCompletion = new Date(initialDateObj.getTime());
        let daysToProcess = Math.ceil(effectiveWorkdaysForCompletionDate);

        // Adjust start date to the first workday if it's a weekend (for calculations)
        // This loop ensures `currentDateForCompletion` starts on a workday.
        // It handles the case where `daysToProcess` might be 0 and start is a weekend.
        while (currentDateForCompletion.getDay() === 0 || currentDateForCompletion.getDay() === 6) { // 0 = Sunday, 6 = Saturday
            currentDateForCompletion.setDate(currentDateForCompletion.getDate() + 1);
        }
        
        if (daysToProcess === 0) {
            // If 0 workdays, completion is on the (potentially advanced) start date.
            estimatedCompletionDateString = currentDateForCompletion.toLocaleDateString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
        } else {
            // `currentDateForCompletion` is now the first workday.
            // We need to find `daysToProcess - 1` additional workdays.
            let workDaysRemaining = daysToProcess;

            // Account for the first workday (currentDateForCompletion itself, which is now a workday)
            if (workDaysRemaining > 0) {
                 // Check if currentDateForCompletion is indeed a workday after initial adjustment
                 // This should always be true due to the while loop above, but as a safe guard.
                 if (currentDateForCompletion.getDay() !== 0 && currentDateForCompletion.getDay() !== 6) {
                    workDaysRemaining--;
                 }
            }
            
            // Loop to find the remaining workdays
            while (workDaysRemaining > 0) {
                currentDateForCompletion.setDate(currentDateForCompletion.getDate() + 1); // Advance to the next calendar day
                const dayOfWeek = currentDateForCompletion.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) { // If it's a weekday
                    workDaysRemaining--; // Decrement the count of workdays we still need to find
                }
            }
            // At this point, currentDateForCompletion is the estimated completion date.
            estimatedCompletionDateString = currentDateForCompletion.toLocaleDateString('es-ES', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
        }
      }

      setResults({
        totalHours,
        diMultimediaHours,
        dgHours,
        detailedBreakdown,
        workdays: totalEffortWorkdays,
        estimatedCompletionDate: estimatedCompletionDateString,
      });
      setHasCalculated(true);
      setIsCalculating(false);
    }, 500);

  }, [numModules, complexity, numDiDesigners, numDgDesigners, startDate]);

  const handleReset = useCallback(() => {
    setCourseName('');
    setCourseCode('');
    setNumModules(0);
    setComplexity(Complexity.Alta);
    setStartDate(''); 
    setNumDiDesigners(1);
    setNumDgDesigners(1);
    setResults(null);
    setHasCalculated(false);
    setIsCalculating(false);
    const formElement = document.getElementById('datosCurso');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div 
        className={`min-h-screen flex flex-col transition-colors duration-300`}
        style={{ backgroundColor: colors.BG_MAIN }}
    >
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
             <InputForm
                courseName={courseName}
                setCourseName={setCourseName}
                courseCode={courseCode}
                setCourseCode={setCourseCode}
                numModules={numModules}
                setNumModules={setNumModules}
                complexity={complexity}
                setComplexity={setComplexity}
                startDate={startDate} 
                setStartDate={setStartDate} 
                numDiDesigners={numDiDesigners}
                setNumDiDesigners={setNumDiDesigners}
                numDgDesigners={numDgDesigners}
                setNumDgDesigners={setNumDgDesigners}
                onCalculate={calculateHours}
                onReset={handleReset}
                isCalculating={isCalculating}
              />
          </div>
          
          <div className="md:col-span-2">
            {(!hasCalculated || !results) ? (
              <ResultsPlaceholder />
            ) : (
              <SummarySection 
                results={results} 
                numDiDesigners={Number(numDiDesigners) > 0 ? Number(numDiDesigners) : 1}
                numDgDesigners={Number(numDgDesigners) > 0 ? Number(numDgDesigners) : 1}
              />
            )}
          </div>
        </div>
        
        {hasCalculated && results && (
          <div className="mt-8">
            <DetailedBreakdownSection 
              results={results}
              courseName={courseName}
              courseCode={courseCode}
              numModules={numModules}
              complexity={complexity}
              startDate={startDate} 
              numDiDesigners={Number(numDiDesigners) > 0 ? Number(numDiDesigners) : 1}
              numDgDesigners={Number(numDgDesigners) > 0 ? Number(numDgDesigners) : 1}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
