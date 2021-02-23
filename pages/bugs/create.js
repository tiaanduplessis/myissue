import Head from "next/head"
import { useRouter } from "next/router"
import { mutate } from "swr"
import { useForm, Controller } from "react-hook-form"

import {
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Radio,
  Stack,
  RadioGroup,
  Switch,
  FormErrorMessage,
  FormHelperText,
  usePrefersReducedMotion,
  useToast,
} from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from "@/lib/auth"

import { PageLayout } from "@/layouts/page"
import { DeviceTable } from "@/components/device-table"

import { useDetectBrowser } from "@/hooks/use-detect-browser"
import { useNetworkInfo } from "@/hooks/use-network-info"
import { useLanguage } from "@/hooks/use-language"
import { useDisplay } from "@/hooks/use-display"
import { useCookieEnabled } from "@/hooks/use-cookie-enabled"

import { createBug } from "@/lib/db"

import { PRIMARY_COLOR_SCHEME } from "@/styles/theme"

import { bugsCreateSchema } from "@/schemas/bugs-create-schema"

const BugsCreate = () => {
  const browser = useDetectBrowser()
  const networkInfo = useNetworkInfo()
  const language = useLanguage()
  const display = useDisplay()
  const cookieEnabled = useCookieEnabled()
  const prefersReducedMotion = usePrefersReducedMotion()

  const { register, handleSubmit, watch, errors, control, formState } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(bugsCreateSchema),
    defaultValues: {
      frequency: "every-time",
      priority: "low",
      share: true,
    },
  })

  const toast = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const { projectId } = router.query

  const backURL = `/bugs${projectId ? `?projectId=${projectId}` : ""}`

  const onCreateBug = async ({ share, ...values }) => {
    const bug = {
      authorId: user?.uid || null,
      projectId: projectId || null,
      createdAt: new Date().toISOString(),
      ...values,
      ...(share && {
        prefersReducedMotion,
        language,
        cookieEnabled,
        ...browser,
        ...networkInfo,
        ...display,
      }),
    }

    const key = projectId ? `/api/projects/${projectId}/bugs` : "/api/bugs"

    mutate(
      key,
      (data) => {
        return { bugs: [bug, ...(data?.bugs ?? [])] }
      },
      false
    )

    if (user) {
      createBug(bug).then(() => mutate(key))
      toast({
        title: "Success!",
        description: "We've created your bug.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      router.push(backURL)
    } else {
      const doc = await createBug(bug)
      mutate(key)
      router.push({
        pathname: '/bugs/[id]',
        query: { id: doc.id, created: true },
      })
    }
  }

  const share = watch("share")

  return (
    <PageLayout
      title="Create a bug"
      breadcrumbs={[{ label: "Bugs", href: backURL }, { label: "Create" }]}
    >
      <Head>
        <title>Create new bug</title>
      </Head>

      <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="md"
        boxShadow="sm"
        p={{
          base: 5,
          md: 10,
        }}
        direction="column"
        as="form"
        onSubmit={handleSubmit(onCreateBug)}
      >
        <FormControl isRequired maxW="xl" isInvalid={errors.title?.message?.length > 0}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            placeholder="Sign in: form failed to submit"
            name="title"
            ref={register}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl maxW="3xl" mt={10} isInvalid={errors.overview?.message?.length > 0}>
          <FormLabel htmlFor="overview">Overview</FormLabel>
          <Textarea
            id="overview"
            minHeight="10rem"
            placeholder="When a user tries to sign in to the platform, they get stuck..."
            name="overview"
            ref={register}
          />

          {errors.overview?.message ? <FormErrorMessage>{errors.overview?.message}</FormErrorMessage> : <FormHelperText>
            Briefly describe the bug.
            </FormHelperText>}
        </FormControl>

        <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.expecting?.message?.length > 0}>
          <FormLabel htmlFor="expecting">What should happen? (Expected behaviour)</FormLabel>
          <Textarea
            minHeight="10rem"
            id="expecting"
            placeholder="Form submits and redirects to dashboard"
            name="expecting"
            ref={register}
          />
          {errors.expecting?.message ? <FormErrorMessage>{errors.expecting?.message}</FormErrorMessage> : <FormHelperText>
          How the software should have performed.
            </FormHelperText>}
        </FormControl>

        <FormControl isRequired maxW="3xl" mt={10}  isInvalid={errors.resulting?.message?.length > 0}>
          <FormLabel htmlFor="resulting">What happened? (Resulting behaviour)</FormLabel>
          <Textarea
            id="resulting"
            minHeight="10rem"
            placeholder="Form stuck in signing in state"
            name="resulting"
            ref={register({
              required: "Required",
            })}
          />
          {errors.resulting?.message ? <FormErrorMessage>{errors.resulting?.message}</FormErrorMessage> : <FormHelperText>
            How the software actually performed.
            </FormHelperText>}
        </FormControl>

        <FormControl isRequired maxW="3xl" mt={10} isInvalid={errors.steps?.message?.length > 0}>
          <FormLabel htmlFor="steps">Steps to reproduce the bug</FormLabel>
          <Textarea
            id="steps"
            minHeight="10rem"
            placeholder={`Enter username. enter password. Click on sign in button...`}
            name="steps"
            ref={register}
          />
          <FormHelperText>
            
          </FormHelperText>

          {errors.steps?.message ? <FormErrorMessage>{errors.steps?.message}</FormErrorMessage> : <FormHelperText>
          Describe what actions you took before you encountered a bug.
            </FormHelperText>}
        </FormControl>


        <FormControl mt={10}>
          <FormLabel htmlFor="frequency">Frequency</FormLabel>
          <Controller
            as={
              <RadioGroup
                id="frequency"
                name="frequency"
                ref={register}
                defaultValue="every-time"
              >
                <Stack spacing={2}>
                  <Radio value="every-time">Every time</Radio>
                  <Radio value="occasionally">Occasionally</Radio>
                  <Radio value="once">Once</Radio>
                </Stack>
              </RadioGroup>
            }
            name="frequency"
            control={control}
          />
        </FormControl>

        <FormControl mt={10}>
          <FormLabel htmlFor="priority">Priority</FormLabel>

          <Controller
            as={
              <RadioGroup
                id="priority"
                name="priority"
                ref={register}
                defaultValue="low"
              >
                <Stack spacing={2}>
                  <Radio value="low">Low</Radio>
                  <Radio value="medium">Medium</Radio>
                  <Radio value="high">High</Radio>
                </Stack>
              </RadioGroup>
            }
            name="priority"
            control={control}
          />
        </FormControl>

        <FormControl id="share" display="flex" alignItems="center" mt={10}>
          <FormLabel>Share device information?</FormLabel>
          <Switch name="share" size="lg" ref={register} />
        </FormControl>

        {share && (
          <DeviceTable
            mt={10}
            data={{
              Browser: browser.name,
              "Browser version": browser.version,
              OS: browser.os,
              Language: language,
              "Estimated effective network type": networkInfo.effectiveType,
              "Estimated effective round-trip time (ms)": networkInfo.rtt,
              "Prefers reduced data usage": networkInfo.saveData ? "Yes" : "No",
              "Prefers reduced motion": prefersReducedMotion ? "Yes" : "No",
              "Cookies enabled": cookieEnabled ? 'Yes' : 'No',
              "Pixel ratio": `${display.devicePixelRatio}`,
              "Screen (width x height)": `${display.screenWidth} x ${display.screenHeight}`,
              "Viewport (width x height)": `${display.windowWidth} x ${display.windowHeight}`,
              "Page (width x height)": `${display.pageWidth} x ${display.pageHeight}`,
              "CSS pixel (width x height)": `${display.cssPixelWidth} x ${display.cssPixelHight}`,
              "Mobile pinch zoom": `${display.pinchZoomScalingFactor * 100}%`,
            }}
          />
        )}

        <ButtonGroup mt={20} size="lg" spacing={4}>

          <Button
            colorScheme={PRIMARY_COLOR_SCHEME}
            fontWeight="medium"
            isLoading={formState.isSubmitting}
            loadingText="Submitting"
            type="submit">
            Create
          </Button>
        </ButtonGroup>
      </Flex>
    </PageLayout>
  )
}

export default BugsCreate
