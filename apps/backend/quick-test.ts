import { wake } from 'wake_on_lan';
import { HARDWARE, HardwareId } from './src/data/hardware';

// wake(yuna, (error: any) => {
//   console.log('Wakie wakie');
//   console.log(error);
// });

const hardware = HARDWARE.find((h) => h?.id === HardwareId.KILSICA);

wake(hardware!.macAddress!, { address: hardware?.ipAddress, port: 7 }, (error: any) => {
  console.log(`Wakie wakie ${hardware?.ipAddress} at ${hardware!.macAddress}`);
  console.log(error);
});
