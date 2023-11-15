import Calendar from "src/components/Calendar";
import EventProvider from "src/context/EventProvider.tsx";

function App() {
  return (
    <EventProvider>
      <Calendar />
    </EventProvider>
  );
}

export default App;
