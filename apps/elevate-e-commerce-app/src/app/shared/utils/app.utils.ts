import { inject } from '@angular/core';
import { ThemeService } from '@shared/services/theme/theme.service';
import { TranslateMangerService } from '@shared/services/translate/translate.service';
import { forkJoin } from 'rxjs';

export const appInit = () => {
  const themeManger = inject(ThemeService);
  const LangManger = inject(TranslateMangerService);

  return forkJoin([themeManger.themeInit(), LangManger.initTranslate()]);
};
