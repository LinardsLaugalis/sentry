import type {StepProps} from 'sentry/components/onboarding/gettingStartedDoc/step';
import type {ReleaseRegistrySdk} from 'sentry/components/onboarding/gettingStartedDoc/useSourcePackageRegistries';
import type {Organization} from 'sentry/types/organization';
import type {PlatformKey, Project, ProjectKey} from 'sentry/types/project';

type GeneratorFunction<T, Params> = (params: Params) => T;
type WithGeneratorProperties<T extends Record<string, any>, Params> = {
  [key in keyof T]: GeneratorFunction<T[key], Params>;
};

export interface PlatformOption<Value extends string = string> {
  /**
   * Array of items for the option. Each one representing a selectable value.
   */
  items: {
    label: string;
    value: Value;
  }[];
  /**
   * The name of the option
   */
  label: string;
  /**
   * The default value to be used on initial render
   */
  defaultValue?: string;
}

export type BasePlatformOptions = Record<string, PlatformOption<string>>;

export type SelectedPlatformOptions<
  PlatformOptions extends BasePlatformOptions = BasePlatformOptions,
> = {
  [key in keyof PlatformOptions]: PlatformOptions[key]['items'][number]['value'];
};

export enum DocsPageLocation {
  PROFILING_PAGE = 1,
}

export interface DocsParams<
  PlatformOptions extends BasePlatformOptions = BasePlatformOptions,
> {
  dsn: ProjectKey['dsn'];
  isFeedbackSelected: boolean;
  isPerformanceSelected: boolean;
  isProfilingSelected: boolean;
  isReplaySelected: boolean;
  organization: Organization;
  platformKey: PlatformKey;
  platformOptions: SelectedPlatformOptions<PlatformOptions>;
  projectId: Project['id'];
  projectSlug: Project['slug'];
  sourcePackageRegistries: {isLoading: boolean; data?: ReleaseRegistrySdk};
  /**
   * The page where the docs are being displayed
   */
  docsLocation?: DocsPageLocation;
  feedbackOptions?: {
    email?: boolean;
    name?: boolean;
    screenshot?: boolean;
  };
  newOrg?: boolean;
  replayOptions?: {
    block?: boolean;
    mask?: boolean;
  };
}

export interface NextStep {
  description: string;
  link: string;
  name: string;
}

export interface OnboardingConfig<
  PlatformOptions extends BasePlatformOptions = BasePlatformOptions,
> extends WithGeneratorProperties<
    {
      configure: StepProps[];
      install: StepProps[];
      verify: StepProps[];
      introduction?: React.ReactNode | React.ReactNode[];
      nextSteps?: (NextStep | null)[];
    },
    DocsParams<PlatformOptions>
  > {}

export interface Docs<PlatformOptions extends BasePlatformOptions = BasePlatformOptions> {
  onboarding: OnboardingConfig<PlatformOptions>;
  crashReportOnboarding?: OnboardingConfig<PlatformOptions>;
  customMetricsOnboarding?: OnboardingConfig<PlatformOptions>;
  feedbackOnboardingCrashApi?: OnboardingConfig<PlatformOptions>;
  feedbackOnboardingNpm?: OnboardingConfig<PlatformOptions>;
  platformOptions?: PlatformOptions;
  replayOnboardingJsLoader?: OnboardingConfig<PlatformOptions>;
  replayOnboardingNpm?: OnboardingConfig<PlatformOptions>;
}

export type ConfigType =
  | 'onboarding'
  | 'feedbackOnboardingNpm'
  | 'feedbackOnboardingCrashApi'
  | 'crashReportOnboarding'
  | 'replayOnboardingNpm'
  | 'replayOnboardingJsLoader'
  | 'customMetricsOnboarding';
