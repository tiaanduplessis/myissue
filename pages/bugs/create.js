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

import { useAuth } from "@/lib/auth"

import { DashboardLayout } from "@/layouts/dashboard"
import { DeviceTable } from "@/components/device-table"

import { useDetectBrowser } from "@/hooks/use-detect-browser"
import { useNetworkInfo } from "@/hooks/use-network-info"
import { useLanguage } from "@/hooks/use-language"
import { useDisplay } from "@/hooks/use-display"

import { createBug } from "@/lib/db"

const BugsCreate = () => {
  const browser = useDetectBrowser()
  const networkInfo = useNetworkInfo()
  const language = useLanguage()
  const display = useDisplay()
  const prefersReducedMotion = usePrefersReducedMotion()

  const { register, handleSubmit, watch, errors, control } = useForm({
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

  const onCreateBug = ({ share, ...values }) => {
    const bug = {
      userId: user?.uid || null,
      projectId: projectId || null,
      createdAt: new Date().toISOString(),
      ...values,
      ...(share && {
        prefersReducedMotion,
        language,
        ...browser,
        ...networkInfo,
        ...display,
      }),
    }

    const key = projectId ? `/api/projects/${projectId}/bugs` : "/api/bugs"
    mutate(
      key,
     (data) => {
        return { bugs: [...data.bugs, bugs] }
      },
      false
    )
    toast({
      title: "Success!",
      description: "We've created your bug.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    createBug(bug).then(() => mutate(key))
    router.push(backURL)
  }

  const share = watch("share")

  return (
    <DashboardLayout
      title="Create an bug"
      breadcrumbs={[{ label: "Bugs", href: backURL }, { label: "Create" }]}
    >
      <Head>
        <title>Create new bug</title>
      </Head>

      <Flex
        width="100%"
        backgroundColor="white"
        bordered="sm"
        boxShadow="sm"
        p={{
          base: 5,
          md: 10,
        }}
        direction="column"
        as="form"
        onSubmit={handleSubmit(onCreateBug)}
      >
        <FormControl id="title" isRequired maxW="xl">
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Sign in: form failed to submit"
            name="title"
            ref={register({
              required: "Required",
            })}
          />
          <FormHelperText>Briefly describe the bug.</FormHelperText>
        </FormControl>

        <FormControl id="steps" isRequired maxW="3xl" mt={10}>
          <FormLabel>Steps to reproduce the bug</FormLabel>
          <Textarea
            placeholder={`Enter username. enter password. Click on sign in button...`}
            name="steps"
            ref={register({
              required: "Required",
            })}
          />
          <FormHelperText>
            Describe what actions you took before you encountered a bug.
          </FormHelperText>
        </FormControl>

        <FormControl id="expecting" isRequired maxW="3xl" mt={10}>
          <FormLabel>Expected result/behaviour</FormLabel>
          <Textarea
            placeholder="Form submits and redirects to dashboard"
            name="expecting"
            ref={register({
              required: "Required",
            })}
          />
          <FormHelperText>
            How the software should have performed
          </FormHelperText>
        </FormControl>

        <FormControl id="resulting" isRequired maxW="3xl" mt={10}>
          <FormLabel>Resulting behaviour</FormLabel>
          <Textarea
            placeholder="Form stuck in signing in state"
            name="resulting"
            ref={register({
              required: "Required",
            })}
          />
          <FormHelperText>How the software actually performed</FormHelperText>
        </FormControl>

        <FormControl id="frequency" mt={10}>
          <FormLabel>Frequency</FormLabel>

          <Controller
            as={
              <RadioGroup
                name="frequency"
                ref={register({
                  required: "Required",
                })}
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

        <FormControl id="priority" mt={10}>
          <FormLabel>Priority</FormLabel>

          <Controller
            as={
              <RadioGroup
                name="priority"
                ref={register({
                  required: "Required",
                })}
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
          <Switch name="share" size="lg" ref={register()} />
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
              "Pixel ratio": `${display.devicePixelRatio}`,
              "CSS pixel width": `${display.cssPixelWidth}px`,
              "CSS pixel height": `${display.cssPixelHight}px`,
              "Window width": `${display.innerWidth}px`,
              "Window height": `${display.innerHeight}px`,
              "Mobile pinch zoom": `${display.pinchZoomScalingFactor * 100}%`,
            }}
          />
        )}

        <ButtonGroup mt={20} size="lg" spacing={4}>
          {/* <Button type="reset" fontWeight="medium">
                Reset
              </Button> */}

          <Button colorScheme="cyan" fontWeight="medium" type="submit">
            Create
          </Button>
        </ButtonGroup>
      </Flex>
    </DashboardLayout>
  )
}

export default BugsCreate
