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

import { PageLayout } from "@/layouts/page"

import { createFeature } from "@/lib/db"

import { PRIMARY_COLOR_SCHEME } from "@/styles/theme"

const FeaturesCreate = () => {
    const toast = useToast()
    const { user } = useAuth()
    const router = useRouter()

    const { register, handleSubmit, watch, errors, control } = useForm({
        defaultValues: {
            type: "feature",
            priority: "low",
        },
    })


    const { projectId } = router.query

    const backURL = `/features${projectId ? `?projectId=${projectId}` : ""}`

    const onCreateFeature = ({ share, ...values }) => {
        const feature = {
            authorId: user?.uid || null,
            projectId: projectId || null,
            createdAt: new Date().toISOString(),
            ...values
        }

        const key = projectId ? `/api/projects/${projectId}/features` : "/api/features"
        mutate(
            key,
            (data) => {
                return { feature: [feature, ...(data?.features ?? [])] }
            },
            false
        )
        toast({
            title: "Success!",
            description: "We've created your feature.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
        createFeature(feature).then(() => mutate(key))
        router.push(backURL)
    }

    return (
        <PageLayout
            title="Create a feature"
            breadcrumbs={[{ label: "Features", href: backURL }, { label: "Create" }]}
        >
            <Head>
                <title>Create new feature</title>
            </Head>

            <Flex
                width="100%"
                backgroundColor="white"
                borderRadius={8}
                boxShadow="sm"
                p={{
                    base: 5,
                    md: 10,
                }}
                direction="column"
                as="form"
                onSubmit={handleSubmit(onCreateFeature)}
            >

                <FormControl id="type">
                    <FormLabel>Type</FormLabel>
                    <Controller
                        as={
                            <RadioGroup
                                name="type"
                                ref={register({
                                    required: "Required",
                                })}
                                defaultValue="feature"
                            >
                                <Stack spacing={2}>
                                    <Radio value="feature">Feature</Radio>
                                    <Radio value="epic">Epic</Radio>
                                </Stack>
                            </RadioGroup>
                        }
                        name="type"
                        control={control}
                    />
                </FormControl>

                <FormControl id="problem" isRequired maxW="3xl" mt={10}>
                    <FormLabel>Problem</FormLabel>
                    <Textarea
                        size="lg"
                        placeholder={"The user can not sign in using Google..."}
                        name="problem"
                        ref={register({
                            required: "Required",
                        })}
                    />
                    <FormHelperText>
                        Describe the problem that the user has.
                    </FormHelperText>
                </FormControl>

                <FormControl id="impact" isRequired maxW="3xl" mt={10}>
                    <FormLabel>Impact</FormLabel>
                    <Textarea
                        size="lg"
                        placeholder={"User's without a Google account can not sign in to the platform..."}
                        name="impact"
                        ref={register({
                            required: "Required",
                        })}
                    />
                    <FormHelperText>
                        Describe the impact this has on the user.
                    </FormHelperText>
                </FormControl>



                <FormControl id="cost" isRequired maxW="3xl" mt={10}>
                    <FormLabel>Cost</FormLabel>
                    <Textarea
                        size="lg"
                        placeholder={"We loose 100s of potential customers who only have a Google account"}
                        name="cost"
                        ref={register({
                            required: "Required",
                        })}
                    />
                    <FormHelperText>
                        Describe the cost of not doing this request.
                    </FormHelperText>
                </FormControl>



                <FormControl id="goal" isRequired maxW="3xl" mt={10}>
                    <FormLabel>Business goal</FormLabel>
                    <Textarea
                        size="lg"
                        placeholder="Increase user sign ups by 10%..."
                        name="goal"
                        ref={register({
                            required: "Required",
                        })}
                    />
                     <FormHelperText>
                     What business goal does the request help us fulfill.
                    </FormHelperText>
                </FormControl>

                <FormControl id="need" isRequired maxW="3xl" mt={10}>
                    <FormLabel>Need for solution</FormLabel>
                    <Textarea
                        size="lg"
                        placeholder="After conducting user testing, we've found..."
                        name="need"
                        ref={register({
                            required: "Required",
                        })}
                    />
                    <FormHelperText>Describe the evidence you have on the need to solve this request.</FormHelperText>
                </FormControl>

                <FormControl id="solution" isRequired maxW="3xl" mt={10}>
                    <FormLabel>Potential solution</FormLabel>
                    <Textarea
                        size="lg"
                        placeholder="Add a 'Sign-in with Google' button to the sign in page of the website..."
                        name="solution"
                        ref={register({
                            required: "Required",
                        })}
                    />
                    <FormHelperText>Describe any ideas you have on a potential solution.</FormHelperText>
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

                <ButtonGroup mt={20} size="lg" spacing={4}>
                    <Button colorScheme={PRIMARY_COLOR_SCHEME} fontWeight="medium" type="submit">
                        Create
          </Button>
                </ButtonGroup>
            </Flex>
        </PageLayout>
    )
}

export default FeaturesCreate
